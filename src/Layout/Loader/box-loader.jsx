
import React, {Fragment} from 'react';

const BoxLoader = () => {

    return (
        <Fragment>
            <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center mb-5">
                    <div className="loader">
                        <div className="loader-box">
                            <div className="loader-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default BoxLoader;