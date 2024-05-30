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


// Função para ler o conteúdo do arquivo
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ url: reader.result, name: file.name });
        };
        reader.onerror = () => reject(`Erro na leitura do arquivo ${file.name}`);
        reader.readAsDataURL(file);
    });
}