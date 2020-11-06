const input = document.getElementById('markdown')
const previewText = document.getElementById('preview-markdown')

function addMarkdown() {
    previewText.innerHTML = marked(input.value)
}