const uploadBtn = document.getElementById('upload-btn');
const imageUpload = document.getElementById('image-upload');
const mainImage = document.querySelector('.main-image');
const imageName = document.querySelector('.container-imagem-name p');
const tagsInput = document.getElementById('tags-input');
const tagsList = document.querySelector('.lista-tags');
const form = document.querySelector('form');

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

// Limpar formulário
document.querySelector('.botao-descartar').addEventListener('click', (event) => {
    event.preventDefault();
    form.reset();
    mainImage.src = './img/imagem1.png'; // Restaurar imagem padrão
    imageName.textContent = 'image_projeto.png'; // Restaurar nome padrão da imagem
    tagsList.innerHTML = ''; // Limpar lista de tags
});

// Evento para botão de publicar
document.querySelector('.botao-publicar').addEventListener('click', async (event) => {
    event.preventDefault();
    const nomeProjeto = document.getElementById('nome').value;
    const descricaoProjeto = document.getElementById('descricao').value;
    const tagsProjeto = Array.from(tagsList.querySelectorAll('p')).map(tag => tag.textContent);

    // Simular uma mensagem de sucesso (substitua por sua lógica real)
    try {
        const result = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
        console.log(result);
        alert('Projeto publicado com sucesso!');
    } catch (error) {
        console.error('Erro ao publicar projeto:', error);
        alert('Erro ao publicar projeto. Verifique o console para mais detalhes.');
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

// Função para publicar o projeto (simulada)
function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        // Simular uma requisição assíncrona, por exemplo, para uma API
        setTimeout(() => {
            // Simular sucesso ou erro aleatoriamente
            const isSuccess = Math.random() > 0.5;
            if (isSuccess) {
                resolve('Projeto publicado com sucesso!');
            } else {
                reject('Erro ao publicar projeto. Tente novamente mais tarde.');
            }
        }, 2000); // Simular um tempo de espera de 2 segundos
    });
}