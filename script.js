function removeComments(code, language) {
  let processed = code;
  
  switch (language) {
    case 'c':
    case 'cpp':
    case 'csharp':
    case 'java':
    case 'javascript':
    case 'typescript':
    case 'go':
    case 'kotlin':
    case 'swift':
    case 'rust':
    
    processed = processed.replace(/\/\/[^\n\r]*/g, '');
    processed = processed.replace(/\/\*[\s\S]*?\*\
    break;
    
    case 'python':
    
    processed = processed.replace(/#[^\n\r]*/g, '');
    
    
    break;
    
    case 'shell':
    
    processed = processed.replace(/#[^\n\r]*/g, '');
    break;
    
    case 'php':
    
    processed = processed.replace(/\/\/[^\n\r]*/g, '');
    processed = processed.replace(/#[^\n\r]*/g, '');
    processed = processed.replace(/\/\*[\s\S]*?\*\
    break;
    
    case 'perl':
    
    processed = processed.replace(/#[^\n\r]*/g, '');
    break;
    
    case 'ruby':
    
    processed = processed.replace(/#[^\n\r]*/g, '');
    
    processed = processed.replace(/^=begin[\s\S]*?^=end\s/gm, '');
    break;
    
    case 'html':
    
    processed = processed.replace(/<!--[\s\S]*?-->/g, '');
    break;
    
    case 'css':
    
    processed = processed.replace(/\/\*[\s\S]*?\*\
    break;
    
    default:
    
    processed = processed.replace(/\/\/[^\n\r]*/g, '');
    processed = processed.replace(/\/\*[\s\S]*?\*\
    break;
  }
  
  return processed;
}


function formatCode(code, language) {
  
  const curlyLanguages = ["c", "cpp", "csharp", "java", "javascript", "typescript", "go", "kotlin", "swift", "rust", "php"];
  if (curlyLanguages.includes(language)) {
    const lines = code.split("\n");
    let indentLevel = 0;
    const indentSize = 2;
    const formattedLines = lines.map(line => {
      let trimmed = line.trim();
      
      if (trimmed.startsWith("}")) {
      indentLevel = Math.max(indentLevel - 1, 0);
    }
    const indentedLine = " ".repeat(indentLevel * indentSize) + trimmed;
    
    if (trimmed.endsWith("{") && !trimmed.includes("}")) {
    indentLevel++;
  }
  return indentedLine;
});
return formattedLines.join("\n").trim();
}

if (language === "python") {
  return code.split("\n").map(line => line.trimEnd()).join("\n").trim();
}

return code.trim();
}


function highlightSyntax(code, language) {
  
  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  }
  
  let html = escapeHtml(code);
  
  if (["c", "cpp", "csharp", "java", "javascript", "typescript", "go", "kotlin", "swift", "rust", "php"].includes(language)) {
    
    const keywords = ["var", "let", "const", "function", "if", "else", "for", "while", "return", "class", "new", "try", "catch", "finally", "switch", "case", "break", "continue", "default", "import", "from", "export", "extends", "super"];
    const keywordRegex = new RegExp("\\b(" + keywords.join("|") + ")\\b", "g");
    html = html.replace(keywordRegex, '<span class="keyword">$1</span>');
    
    html = html.replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>');
  } else if (language === "python") {
  const keywords = ["def", "return", "if", "elif", "else", "for", "while", "import", "from", "as", "class", "try", "except", "finally", "with", "lambda", "pass", "yield"];
  const keywordRegex = new RegExp("\\b(" + keywords.join("|") + ")\\b", "g");
  html = html.replace(keywordRegex, '<span class="keyword">$1</span>');
  html = html.replace(/(".*?"|'.*?')/g, '<span class="string">$1</span>');
} else if (language === "html") {

html = html.replace(/(&lt;\/?)(\w+)/g, '$1<span class="tag">$2</span>');
html = html.replace(/(\s)(\w+)=/g, '$1<span class="attr">$2</span>=');
html = html.replace(/("(.*?)")/g, '<span class="string">$1</span>');
} else if (language === "css") {

html = html.replace(/([a-zA-Z-]+)(\s*:\s*)/g, '<span class="keyword">$1</span>$2');
html = html.replace(/("(.*?)")/g, '<span class="string">$1</span>');
}
return html;
}


function handleRemoveComments() {
  const languageSelect = document.getElementById('languageSelect');
  const codeInput = document.getElementById('codeInput');
  const processedCodeElement = document.getElementById('processedCode');
  
  const language = languageSelect.value;
  if (!language) {
    processedCodeElement.textContent =
    'Please select a language before removing comments.';
    return;
  }
  
  const originalCode = codeInput.value || '';
  const noComments = removeComments(originalCode, language);
  const formatted = formatCode(noComments, language);
  const highlighted = highlightSyntax(formatted, language);
  
  
  processedCodeElement.innerHTML = highlighted;
}


function copyToClipboard() {
  const processedCode = document.getElementById('processedCode').innerText;
  if (!processedCode) return;
  navigator.clipboard.writeText(processedCode)
  .then(() => {
    alert('Processed code copied to clipboard!');
  })
  .catch(err => {
    console.error('Error copying text:', err);
  });
}


function downloadFile() {
  const processedCode = document.getElementById('processedCode').innerText;
  if (!processedCode) return;
  const blob = new Blob([processedCode], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'processed_code.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function handleFileUpload(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('codeInput').value = e.target.result;
  };
  reader.readAsText(file);
}


function resetFields() {
  document.getElementById('codeInput').value = '';
  document.getElementById('processedCode').innerHTML = '';
}


function init() {
  const languageSelect = document.getElementById('languageSelect');
  const codeInput = document.getElementById('codeInput');
  const removeCommentsBtn = document.getElementById('removeCommentsBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const resetBtn = document.getElementById('resetBtn');
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const uploadStatus = document.getElementById('uploadStatus');
  
  
  languageSelect.addEventListener('change', resetFields);
  
  
  removeCommentsBtn.addEventListener('click', handleRemoveComments);
  
  
  copyBtn.addEventListener('click', copyToClipboard);
  downloadBtn.addEventListener('click', downloadFile);
  
  
  resetBtn.addEventListener('click', resetFields);
  
  
  uploadBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
      uploadStatus.textContent = `Loaded: ${e.target.files[0].name}`;
    }
  });
  
  
  codeInput.addEventListener('dragover', (e) => {
    e.preventDefault();
    codeInput.classList.add('dragover');
  });
  codeInput.addEventListener('dragleave', () => {
    codeInput.classList.remove('dragover');
  });
  codeInput.addEventListener('drop', (e) => {
    e.preventDefault();
    codeInput.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
      uploadStatus.textContent = `Loaded: ${e.dataTransfer.files[0].name}`;
    }
  });
}


document.addEventListener('DOMContentLoaded', init);