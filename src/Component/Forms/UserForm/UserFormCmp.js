import React from 'react'
import Aux from '../../../hoc';

const UserFormCmp = (props) => {
    return (
        <Aux>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <h5 className="text-white mx-2 text-center">Treasury Officer/Branch Manager Panel</h5>
                        <div className="contact-form">
                            <form className="my-4 bg-form" onSubmit={(event) => props.login(event, '0')}>
                                {/* <div className="form-group position-relative">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input type="text" className="form-control custom-inp"
                                        name="name" onChange={props.change}
                                        placeholder="Full Name" required />
                                    <i className="fas fa-user input_icon" />
                                </div> */}
                                <div className="form-group position-relative">
                                    <label className="text-white text-center" htmlFor="email">Username</label>
                                    <input type="text" className="form-control custom-inp bg-inp"
                                        name="email" onChange={props.change}
                                        placeholder="Username" required />
                                </div>
                                <div className="form-group position-relative">
                                    <label className="text-white text-center" htmlFor="password">Password</label>
                                    <input type="password" className="form-control custom-inp bg-inp"
                                        name="password" onChange={props.change}
                                        placeholder="password" required />
                                </div>
                                <div className="text-center">
                                    <button type="submit" disabled={props.check} className="btn custom-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade mx-3 my-3" id="login" tabIndex={-1} role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">

                            <form onSubmit={(event) => props.login(event, '1')}>
                                <h2 className="text-center text-danger">
                                    {props.message}
                                </h2>
                                <div className="mt-2 text-center">
                                    <button type="button" className="btn custom-btn bg-secondary mr-2" data-dismiss="modal">
                                        NO
                                    </button>
                                    <button type="submit" className="btn custom-btn">YES</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 className="services-heading text-white text-center bottom-officer">Powered by Syntizen</h5>
            </div>

        </Aux>
    )
}

export default UserFormCmp;
