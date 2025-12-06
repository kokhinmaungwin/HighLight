function broHighlight(code){
    code = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    
let strings = [];

/* 1. STRING TEMP REMOVE */
code = code.replace(/("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`)/g, s => {
  strings.push(s);
  return `__STR_${strings.length - 1}__`;
});

code = code.replace(/\bclass\b/gi, "<span class='attr'>class</span>"
);

/* 2. TEMP REMOVE HTML TAGS (so class="" inside tag won't be touched) */

let tags = [];
  
code = code.replace(/<[^>]+>/g, t => {
  tags.push(t);
  return `__TAG_${tags.length - 1}__`;
});

code = code.replace(/=/g, "<span class='c8'>=</span>");

code = code.split(/(<span[^>]*>.*?<\/span>)/gi).map(part => {
  if (part.startsWith('<span')) return part;
  return part.replace(/\bspan\b/gi, "<span class='c5'>span</span>");
}).join('');
  
/* ===========================
   5. RESTORE HTML TAGS
=========================== */
code = code.replace(/__TAG_(\d+)__/g, (m, i) => {
  return tags[i];
});

code = code.replace(/__STR_(\d+)__/g, (m, i) => {
  return `<span class="str">${strings[i]}</span>`;
});
 
code = code.replace(/\b(display|padding|width|height|color|size|radius|family|x|y|shadow|space|wrap|block|bottom|decoration|float|position|direction|section|repeat|tag|user|transparent|bold|column|clamp|orient|popcount|all|before)\b/g,
  "<span class='c4'>$1</span>"
);
  
code = code.replace(/\b(auto|none|absolute|vertical|pointer|hidden|hover|index|flex|inline|outline|solid|align|important|icon|png|weight|relative|list|nowrap|child|min|ease|only|transform|scroll|content|grid|normal|row)\b/g,
  "<span class='c11'>$1</span>"
);
  
code = code.replace(/\b(z|word|white|max|box|cursor|background|border|font|overflow|margin|resize|break|gap|line|center|mask|top|rtl|opacity|media|X|placeholder|msg|sticky|end|start|aspect|fit|reset|duration|scale|capitalize|pulse)\b/g,
  "<span class='c2'>$1</span>"
);
  
code = code.replace(/\b(transition|webkit|inset|moz|rgba|screen|fixed|translate|justify|items|separator|events|self|shrink|ratio|cover|dashed|grow|ellipsis|template|minmax|sizing|uppercase|underline|counter|name|duration|timing|iteration)\b/g, "<span class='c16'>$1</span>"
);

code = code.replace(/\b(initial|rgb|animation|infinite|keyframes|fill|target|indent)\b/g, "<span class='c18'>$1</span>"
);

code = code.replace(/\b(const|let|var|function|return|if|else|for|while|switch|new|export|import|try|catch|await|async)\b/g, "<span class='kw'>$1</span>"
);
   
code = code.replace(/\b(h1|h2|h3|h4|h5|h6|button|pre|textarea|body|html|style|script|input|head|div|form|a|link|iframe|ul|ol|li|title|meta|b:if|i|select|option|table|tbody|th|tr|td|svg|img|label|code|blockquote|p|nav|header|footer|section|article|aside|main|strong|small|video|audio|source|canvas|details|summary|fieldset|legend|datalist|picture|figure|figcaption|br|hr|embed|object|param|noscript)\b/g,
  "<span class='c5'>$1</span>"
);

code = code.replace(/\b(id|src|href|type|value|name|cond|url)\b/g,
  "<span class='attr'>$1</span>"
);

code = code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g,"<span class='func'>$1</span>"
);
    
code = code.replace(/(&lt;\/?[a-zA-Z0-9\-]+&gt;)/g,"<span class='tag'>$1</span>"
);
  
code = code.replace(/(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, "<span class='cm'>$1</span>"
);
    
code = code.replace(/(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}))(?![^<]*>)/g, m =>
    `<span class='c1'>${m}</span>`
);
  
code = code.replace(/(\-|\*|\_|\,|\!|\$)/g,
  "<span class='op'>$1</span>"
);
  
code = code.replace(/(px|%|rem|em|@|vh|#)/g,
  "<span class='c3'>$1</span>"
);

code = code.replace(/(\{|\}|\[|\]|\(|\))/g,
  "<span class='c9'>$1</span>"
);
  
code = code.replace(/\b(\d+)\b/g, "<span class='num'>$1</span>"
);
  
code = code.replace(/(\.|\:|\+|\-|\&amp;|\\)/g,
  "<span class='c12'>$1</span>"
);
  
code = code.replace(/\b(document|window|Math|JSON)\b/g, "<span class='c19'>$1</span>"
);
 
code = code.replace(/\b(innerHTML|innerText|onclick|clipboard|overlay|create|app|remove|query|scrollTop|click)\b/g, "<span class='c13'>$1</span>"
);
  
code = code.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, "<span class='c14'>$1</span>"
);
  
code = code.replace(/(\(\)\s*=>\s*\{\})/g, "<span class='c15'>$1</span>"
);

code = code.replace(/\b(Selector|Range)\b/g, "<span class='c17'>$1</span>"
);

code = code.replace(/\b(true|false|null|undefined)\b/g, "<span class='bool'>$1</span>"
);

    return code;
}
