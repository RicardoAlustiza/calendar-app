import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';
import './LogInPage.css';

const logInFormFields = {
    logInEmail: '',
    logInPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: ''
}

export const LogInPage = () => {

    const { startLogIn, startRegister, errorMessage } = useAuthStore();

    const { logInEmail, logInPassword, onInputChange: onLogInInputChange } = useForm(logInFormFields);
    const { registerName, registerEmail, registerPassword, registerConfirmPassword, onInputChange: onRegisterInputChange } = useForm(registerFormFields);             

    const logInSubmit = (event) => {
        event.preventDefault();

        startLogIn({ email: logInEmail, password: logInPassword });
    }

    const registerSubmit = (event) => {
        event.preventDefault();
    
        if(registerPassword !== registerConfirmPassword) {
            Swal.fire('Error on registry', 'Passwords must be the same', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Authentication error', errorMessage, 'error');
        }
    }, [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={logInSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='logInEmail'
                                value={logInEmail}
                                onChange={onLogInInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='logInPassword'
                                value={logInPassword}
                                onChange={onLogInInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerConfirmPassword'
                                value={registerConfirmPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
