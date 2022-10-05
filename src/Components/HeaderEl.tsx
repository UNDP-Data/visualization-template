import '../style/headerStyle.css';

export const HeaderEl = () => (
  <div className='margin-bottom07'>
    <header className='undp-country-header'>
      <div className='undp-header-bg'>
        <div className='flex-div flex-vert-align-center'>
          <img src='https://design.undp.org/static/media/undp-logo-blue.4f32e17f.svg' alt='UNDP Logo' />
          <div className='undp-site-title'>
            <span><a href='https://data.undp.org/' target='_blank' rel='noreferrer'>Data Futures Platform</a></span>
            <span><a href='/'>Design Style Guidelines</a></span>
          </div>
        </div>
      </div>
    </header>
  </div>
);
