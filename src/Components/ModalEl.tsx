import { Modal } from 'antd';
import { useState } from 'react';

export const ModalEl = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='flex-wrap margin-bottom-07'>
      <button type='button' tabIndex={0} className='undp-button button-primary button-arrow' onKeyDown={(e) => { if (e.key === 'Enter') setOpenModal(true); }} onClick={() => { setOpenModal(true); }}>Open Modal</button>
      <Modal
        className='undp-modal'
        onCancel={() => { setOpenModal(false); }}
        onOk={() => { setOpenModal(false); }}
        title='UNDP Modal'
        open={openModal}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis purus velit, non tempus dolor semper in. Vestibulum efficitur ullamcorper odio, quis dictum enim faucibus et. Fusce eget leo non nisi euismod ultrices sed ac leo. Fusce dictum mi nec eros vulputate, in pellentesque mauris pharetra. Duis mattis nec nulla in vestibulum. In volutpat augue et arcu facilisis varius et id diam. Cras auctor lobortis urna, et rhoncus nisl consectetur blandit. Nulla facilisi. Duis nisi erat, euismod vestibulum varius a, accumsan et mi. Vivamus sit amet metus orci.
        Aenean mauris elit, laoreet a auctor non, sodales vel neque. Nullam eleifend, nibh ut dictum egestas, odio leo fermentum ex, vitae congue nisl massa at mi. Etiam eu lectus tincidunt, aliquet tellus et, consectetur augue. Nam fermentum malesuada efficitur. Etiam eu lorem odio. Duis lobortis tortor et vulputate tincidunt. Praesent pulvinar tempor nulla non malesuada. Sed molestie leo nisl. Nunc rutrum tempor consectetur. Fusce eleifend nisi in rhoncus lobortis. Maecenas tellus sapien, sodales sed euismod eget, fermentum eget mi. Nulla facilisi. Aliquam a nisl neque. Cras diam orci, semper ut orci et, lobortis mollis nunc.
      </Modal>
    </div>
  );
};
