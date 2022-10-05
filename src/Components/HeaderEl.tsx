import '../style/headerStyle.css';

export const HeaderEl = () => (
  <div className='margin-bottom07'>
    <header className='undp-country-header'>
      <div className='undp-header-bg'>
        <div className='flex-div flex-vert-align-center'>
          <img src='https://design.undp.org/static/media/undp-logo-blue.4f32e17f.svg' alt='UNDP Logo' />
          <div className='undp-site-title'>
            <span>Data Futures Platform</span>
            <span>Design Style Guidelines</span>
          </div>
        </div>
      </div>
    </header>
  </div>
);
