const formFieldNames = ['nombre', 'apellido', 'usuario', 'password'];

const cargarLista = () => {
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.length) {
            usuarios.map(us => agregarUsuarioLista(us));
        }
    } catch(e) {
        throw e;
    }
}

const guardarUsuario = (usuario) => {
    try {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        return Promise.resolve();
    } catch(e) {
        return Promise.reject(e);
    }
};

const agregarUsuarioLista = ({nombre}) => {
    try {
        const ul = document.getElementById('users-list');

        let li = document.createElement('li');
        li.appendChild(document.createTextNode(nombre));
        ul.appendChild(li);

        return Promise.resolve();
    } catch(e) {
        return Promise.reject(e);
    }
}

const deshabilitarBoton = (value) => {
    const element = document.getElementById('button-submit');

    element.disabled = value;
};

const joinStrings = (separator, ...values) => (
    values.join(separator)
);

const clearErrorMessages = () => {
    formFieldNames.forEach((name) => {
        const elemento = document.getElementById(`${name}-group`);

        if(elemento) {
            const nodoHijo = elemento.getElementsByClassName('class-error');

            if (nodoHijo.length) {
                elemento.removeChild(nodoHijo[0]);
            }
        }

    });
};

const validateFormValues = (values) => {
    let isValid = true;
    let fieldErrors = [];

    formFieldNames.map(name => {
        const {value, elementHtml} = values[name];

        if (!value || (['nombre', 'apellido'].includes(name) && value.match(/[0-9]/g)) ) {
            isValid = false;
            fieldErrors = [
                ...fieldErrors,
                name,
            ];

            let parrafo = document.createElement('p');

            parrafo.innerHTML = `${name.charAt(0).toUpperCase()}${name.substr(1)} es invalido`;
            parrafo.style.color = 'red';
            parrafo.className = 'class-error';

            elementHtml.append(parrafo);
            //elementHtml.style.color = 'red';
        }

        // contraseña: longitud > 7, 1 mayuscula, 1, numero, NO spec char
        // /^(?=.*\d)[a-zA-Z0-9]{7,}/g,

        // usuario: no caracteres espec., empiece con letra mayuscula
    });

    if (!isValid) {
        event.preventDefault();
        const errorMesg = joinStrings(',', fieldErrors);

        //console.log(`The field ${errorMesg} contain errors.`);

        return false;
    }

    //alert('El form se ha guardado con Exito!');
};

function onSubmit() {
    clearErrorMessages();

    const inputs = document.forms['myForm'];
    let formvalues = {};

    if (inputs) {
        formFieldNames.forEach((name) => {
            formvalues = {
                ...formvalues,
                [name]: inputs[name].value,
            }
        });
    }

    // if (inputs) {
    //     formFieldNames.forEach((name) =>
    //         formvalues[name] = {
    //             value: inputs[name].value,
    //             //elementHtml: document.getElementById(`${name}-group`),
    //     });
    // }

    //validateFormValues(formvalues);

    guardarUsuario(formvalues)
    .then(() => {
        document.getElementById("myForm").reset();
        agregarUsuarioLista(formvalues);
    })
    .catch((error) => {
        alert('OCURRIO UN ERROR!!!');
        console.log('Error: ', error);
    });
};


function onChangeField(inputValue) {
    const {value, id} = inputValue;
    //add validate
    const elemento = document.getElementById(`${id}-group`);

        if(elemento) {
            const nodoHijo = elemento.getElementsByClassName('class-error');

            if (nodoHijo.length) {
                elemento.removeChild(nodoHijo[0]);
            }
        }



    if (!value || !value.match(/^[A-Z](.*[a-z])$/)) {
        let parrafo = document.createElement('p');

        parrafo.innerHTML = `${id.charAt(0).toUpperCase()}${id.substr(1)} es invalido`;
        parrafo.style.color = 'red';
        parrafo.className = 'class-error';

        //const elemento = document.getElementById(`${id}-group`);

        elemento.append(parrafo);
        deshabilitarBoton(true);
        return;
    }

    deshabilitarBoton(false);
}

function onChangeContraseña(inputValue) {
    const {value, id} = inputValue;
    //add validate
    const elemento = document.getElementById(`${id}-group`);

    if(elemento) {
        const nodoHijo = elemento.getElementsByClassName('class-error');

        if (nodoHijo.length) {
            elemento.removeChild(nodoHijo[0]);
        }
    }

    if (!value || !value.match(/^(?=.*\d)[a-zA-Z0-9]{7,}/g)) {
        let parrafo = document.createElement('p');

        parrafo.innerHTML = `${id.charAt(0).toUpperCase()}${id.substr(1)} es invalido`;
        parrafo.style.color = 'red';
        parrafo.className = 'class-error';

        //const elemento = document.getElementById(`${id}-group`);

        elemento.append(parrafo);
        deshabilitarBoton(true);
        return;
    }

    deshabilitarBoton(false);
}

const scrollFunction = (e) => {
  let termsDiv = e.target;
  var saveButton = document.getElementById('button-submit');
  if(termsDiv.scrollTop + termsDiv.offsetHeight >= termsDiv.scrollHeight) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
};

document
  .getElementById('terms-and-conditions')
  .addEventListener('scroll', scrollFunction);
