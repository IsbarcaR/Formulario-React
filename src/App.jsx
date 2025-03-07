import React, { useState } from 'react';

const FormularioRegistro = () => {
  const initialFormData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    edad: '',
    telefono: '',
    pais: '',
    terminos: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('initial'); // initial | submitting | success | error

  const validarFormulario = () => {
    let errores = {};

    if (!formData.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
    if (!formData.apellido.trim()) errores.apellido = 'El apellido es obligatorio.';
    
    if (!formData.email.trim()) {
      errores.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errores.email = 'Formato de correo inválido.';
    }

    if (!formData.password) {
      errores.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 8) {
      errores.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!formData.edad) {
      errores.edad = 'La edad es obligatoria.';
    } else if (parseInt(formData.edad) < 18) {
      errores.edad = 'Debes tener al menos 18 años.';
    }

    if (!formData.telefono) {
      errores.telefono = 'El teléfono es obligatorio.';
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      errores.telefono = 'El teléfono debe tener exactamente 10 dígitos.';
    }

    if (!formData.pais) errores.pais = 'El país es obligatorio.';

    if (!formData.terminos) errores.terminos = 'Debes aceptar los términos y condiciones.';

    return errores;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validarFormulario();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus('error');
      return;
    }

    setErrors({});
    setStatus('submitting');

    // Simulación de envío
    setTimeout(() => {
      try {
        localStorage.setItem('formData', JSON.stringify(formData));
        setStatus('success');
        setFormData(initialFormData);
      } catch (error) {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <div>
      <h2>Formulario de Registro</h2>
      
      {status === 'success' && <p style={{color: 'green'}}>¡Formulario enviado correctamente!</p>}
      {status === 'error' && Object.keys(errors).length === 0 && (
        <p style={{color: 'red'}}>Ocurrió un error al enviar el formulario.</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        /> <br />
        {errors.nombre && <p style={{color:'red'}}>{errors.nombre}</p>}

        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
        /><br />
        {errors.apellido && <p style={{color:'red'}}>{errors.apellido}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
        /><br />
        {errors.email && <p style={{color:'red'}}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        /><br />
        {errors.password && <p style={{color:'red'}}>{errors.password}</p>}

        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
        /><br />
        {errors.edad && <p style={{color:'red'}}>{errors.edad}</p>}

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono (10 dígitos)"
          value={formData.telefono}
          onChange={handleChange}
        /><br />
        {errors.telefono && <p style={{color:'red'}}>{errors.telefono}</p>}

        <select name="pais" value={formData.pais} onChange={handleChange}>
          <option value="">Selecciona un país</option>
          <option value="México">México</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="España">España</option>
        </select><br />
        {errors.pais && <p style={{color:'red'}}>{errors.pais}</p>}

        <label>
          <input
            type="checkbox"
            name="terminos"
            checked={formData.terminos}
            onChange={handleChange}
          /> Acepto los términos y condiciones
        </label><br />
        {errors.terminos && <p style={{color:'red'}}>{errors.terminos}</p>}

        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Enviando...' : 'Registrarse'}
        </button>
      </form>
      
    </div>
  );
};

export default FormularioRegistro;
