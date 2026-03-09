import { useState, useMemo } from "react";
import { Check, Copy } from "lucide-react";

const KEYWORDS = new Set([
  "public","private","protected","class","interface","abstract","static","final",
  "void","new","return","extends","implements","import","package","this","super",
  "null","true","false","throws","throw","try","catch","for","if","else","switch",
  "case","default","break","continue","instanceof","while","do","enum","record","var"
]);

const TYPES = new Set([
  "String","int","double","boolean","float","long","char","byte","short",
  "List","Map","Set","ArrayList","HashMap","HashSet","Arrays","System",
  "Math","Object","Optional","Stream","Deque","ArrayDeque","Collections",
  "StringBuilder","StringBuffer","Integer","Double","Boolean","Long","Character"
]);

interface TokenSpan {
  text: string;
  type: "keyword" | "type" | "string" | "comment" | "annotation" | "plain";
}

function tokenizeLine(line: string): TokenSpan[] {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//")) {
    return [{ text: line, type: "comment" }];
  }
  const tokens: TokenSpan[] = [];
  const regex = /"[^"]*"|'[^']*'|(@\w+)|([A-Za-z_]\w*)|([^A-Za-z_"'@\n]+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    const tok = match[0];
    if (tok.startsWith('"') || tok.startsWith("'")) {
      tokens.push({ text: tok, type: "string" });
    } else if (tok.startsWith("@")) {
      tokens.push({ text: tok, type: "annotation" });
    } else if (KEYWORDS.has(tok)) {
      tokens.push({ text: tok, type: "keyword" });
    } else if (TYPES.has(tok)) {
      tokens.push({ text: tok, type: "type" });
    } else {
      tokens.push({ text: tok, type: "plain" });
    }
  }
  return tokens;
}

const tokenColorMap: Record<TokenSpan["type"], string> = {
  keyword: "text-code-keyword",
  type: "text-code-type",
  string: "text-code-string",
  comment: "text-code-comment",
  annotation: "text-code-annotation",
  plain: "text-code-foreground",
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "Java" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => code.split("\n"), [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-code-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-code-header border-b border-code-border">
        <span className="text-xs font-medium text-muted-foreground font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-code-string" />
              <span className="text-code-string">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto bg-code-bg scrollbar-thin">
        <pre className="p-4 text-sm leading-relaxed font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none text-code-comment/50 w-8 text-right mr-4 text-xs leading-relaxed flex-shrink-0">
                {i + 1}
              </span>
              <span>
                {tokenizeLine(line).map((token, j) => (
                  <span key={j} className={tokenColorMap[token.type]}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
