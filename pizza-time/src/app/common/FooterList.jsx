import React from 'react';
import PropTypes from 'prop-types';

const FooterList = ({ children }) => {
    return (
        <div className='w-full  mb-6 flex flex-col gap-2'>
            {children}
        </div>
    );
};

FooterList.propTypes = {
    children: PropTypes.node.isRequired
};

export default FooterList;
