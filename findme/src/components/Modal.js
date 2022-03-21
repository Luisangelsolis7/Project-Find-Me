function Modal(props){
    if(!props.show){
        return null;
    }
    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        This is a title
                    </h4>
                </div>
                <div className="modal-body">
                    This is modal content,
                    we are going to have the add function here
                </div>
                <div className="modal-footer">
                    <button>Add</button>
                    <button onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
export default Modal;