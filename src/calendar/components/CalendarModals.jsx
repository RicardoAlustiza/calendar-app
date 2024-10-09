import { useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import DatePicker, {registerLocale} from "react-datepicker";
import {es} from 'date-fns/locale/es';

import 'sweetalert2/dist/sweetalert2.min.css';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModals = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Event',
        notes: 'Eevent notes',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleCLass = useMemo(() => {

        if(!formSubmitted) return ''

        return formValues.title.length > 2 ? '' : 'is-invalid';

    }, [formValues.title, formSubmitted]);

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onCloseModal = () => {
        console.log('Modal closed');
        setIsOpen(false);
    }

    const onDateChange = (event, changing) => {
        setFormValues({ ...formValues, [changing]: event });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);
        
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Error', 'End date must be greater than start date', 'error');
            return;
        }
        if (formValues.title.length < 2) {
            return;
        }

        console.log(formValues);
    }

    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
        <h1> New Event </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>

            <div className="form-group mb-2">
                <label>Start Datetime</label>
                <DatePicker 
                    selected={ formValues.start }
                    onChange={(event) => onDateChange(event, 'start')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>End Datetime</label>
                <DatePicker 
                    minDate={ formValues.start }
                    selected={ formValues.end }
                    onChange={(event) => onDateChange(event, 'end')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption='Hora'
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and notes</label>
                <input 
                    type="text" 
                    className={`form-control ${titleCLass}`}
                    placeholder="Event title"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">short description</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notes"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Aditional information</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                &nbsp;
                <span>Save Event</span>
            </button>

        </form>
    </Modal>
    )
}
