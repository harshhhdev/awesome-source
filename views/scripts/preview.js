const form = document.getElementById('markdown')
const previewPage = document.getElementById('preview-markdown')
const preview = document.getElementById('preview')

var previewMarkdown = false;

function previewToggle() {
    if (previewMarkdown) {
        preview.innerHTML = '<i class="fas fa-eye-slash"></i>Write Markdown'

        form.style.display = "none"
        previewPage.style.display = "flex"

        previewMarkdown = false
    } else {
        preview.innerHTML = '<i class="fas fa-eye"></i>Preview Markdown'

        form.style.display = "flex"
        previewPage.style.display = "none"

        previewMarkdown = true
    }
}

previewToggle()