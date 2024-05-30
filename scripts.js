const uploadBtn = document.getElementById('upload-btn');
const imageUpload = document.getElementById('image-upload');
const mainImage = document.querySelector('.main-image');
const imageName = document.querySelector('.container-imagem-name p');
const tagsInput = document.getElementById('tags-input');
const tagsList = document.querySelector('.lista-tags');

// Evento para o botão de upload de imagem
uploadBtn.addEventListener('click', () => {
    imageUpload.click();
});

// Evento para quando uma nova imagem é carregada
imageUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImage.src = fileContent.url;
            imageName.textContent = file.name;
        } catch (error) {
            console.error('Erro na leitura do arquivo:', error);
        }
    }
});

// Adicionar nova tag
tagsInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tagText = tagsInput.value.trim();
        if (tagText !== '') {
            const newTag = document.createElement('li');
            newTag.innerHTML = `<p>${tagText}</p><img src="./img/close-black.svg" class="remove-tag">`;
            tagsList.appendChild(newTag);
            tagsInput.value = '';
        }
    }
});

// Remover tag
tagsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-tag')) {
        const tagToRemove = event.target.parentElement;
        tagsList.removeChild(tagToRemove);
    }
});
