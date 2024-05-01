document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('fileInput');
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.close');
    const deleteImageBtn = document.getElementById('deleteImageBtn');
    const addImageButton = document.getElementById('addImageButton');

    let savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    let deleteMode = false;
    let selectedImage = null;

    function saveImagesToStorage() {
        localStorage.setItem('galleryImages', JSON.stringify(savedImages));
    }

    savedImages.forEach(function(imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        gallery.appendChild(imageElement);

        imageElement.addEventListener('click', function() {
            if (deleteMode) {
                selectedImage = imageUrl;
                const confirmDelete = confirm('¿Estás seguro de querer eliminar esta imagen?');
                if (confirmDelete) {
                    const index = savedImages.indexOf(selectedImage);
                    if (index !== -1) {
                        savedImages.splice(index, 1);
                        saveImagesToStorage();
                        updateGallery();
                    }
                }
                deleteMode = false;
                deleteImageBtn.src = 'boton-normal.png'; // Cambiar la imagen del botón a modo normal
            } else {
                modal.style.display = 'block';
                modalImg.src = imageUrl;
            }
        });
    });

    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    deleteImageBtn.addEventListener('click', function() {
        if (!deleteMode) {
            deleteMode = true;
            deleteImageBtn.src = 'imagenes/basurero2.png'; // Cambiar la imagen del botón a modo eliminación
        } else {
            deleteMode = false;
            deleteImageBtn.src = 'imagenes/basurero.png'; // Cambiar la imagen del botón a modo normal
        }
    });

    addImageButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Mueve este bloque de código fuera del DOMContentLoaded
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            gallery.appendChild(imageElement);
            savedImages.push(imageUrl);
            saveImagesToStorage();

            imageElement.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = imageUrl;
            });
        };

        reader.readAsDataURL(file);
    });

    function updateGallery() {
        gallery.innerHTML = '';
        savedImages.forEach(function(imageUrl) {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            gallery.appendChild(imageElement);

            imageElement.addEventListener('click', function() {
                if (deleteMode) {
                    selectedImage = imageUrl;
                    const confirmDelete = confirm('¿Estás seguro de querer eliminar esta imagen?');
                    if (confirmDelete) {
                        const index = savedImages.indexOf(selectedImage);
                        if (index !== -1) {
                            savedImages.splice(index, 1);
                            saveImagesToStorage();
                            updateGallery();
                        }
                    }
                    deleteMode = false;
                    deleteImageBtn.src = 'imagenes/basurero.png'; // Cambiar la imagen del botón a modo normal
                } else {
                    modal.style.display = 'block';
                    modalImg.src = imageUrl;
                }
            });
        });
    }
});
