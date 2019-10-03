const formFieldNames = ['nombre', 'apellido', 'usuario', 'password'];

const joinStrings = (separator, ...values) => (
    values.join(separator)
);

const clearErrorMessages = () => {
    const parrafosEncontrados = document.getElementsByTagName('p');

    Array.from(parrafosEncontrados).forEach((parrafo) => {
        parrafo.innerHTML = "";
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

        console.log(`The field ${errorMesg} contain errors.`);

        return false;
    }

    alert('El form se ha guardado con Exito!');
};

function onSubmit() {
    clearErrorMessages();

    const inputs = document.forms['myForm'];
    let formvalues = {};

    // 1ra fase
    // const formValues = {
    //     nombre: {
    //         value: inputs['nombre'].value,
    //     },
    //     apellido: inputs['apellido'].value,
    //     usuario: inputs['usuario'].value,
    //     password: inputs['password'].value
    // }

    //2da fase
    if (inputs) {
        formFieldNames.forEach((name) =>
            formvalues[name] = {
                value: inputs[name].value,
                elementHtml: document.getElementById(`${name}-group`),
        });
    }

    validateFormValues(formvalues);
};

const scrollFunction = (e) => {
  let termsDiv = e.target;
  if(termsDiv.scrollTop + termsDiv.offsetHeight >= termsDiv.scrollHeight) {
    var saveButton = document.getElementById('saveButton');
    saveButton.disabled = false;
  }
};

document
  .getElementById('terms-and-conditions')
  .addEventListener('scroll', scrollFunction);
