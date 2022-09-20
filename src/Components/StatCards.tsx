import '../style/statCardStyle.css';

export const StatCards = () => (
  <div className='flex-wrap margin-bottom-07'>
    <div className='margin-bottom-07'>
      <h6>Stat Cards With H2</h6>
      <div style={{ width: '25%' }}>
        <div className='stat-card'>
          <h2>832</h2>
          <h4>Million</h4>
          <p>Lorem Ipsum dolor sit Amet</p>
        </div>
      </div>
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-07'>
      <h6>Stat Cards With H3</h6>
      <div style={{ width: '25%' }}>
        <div className='stat-card'>
          <h3>832</h3>
          <h4>Million</h4>
          <p>Lorem Ipsum dolor sit Amet</p>
        </div>
      </div>
    </div>
  </div>
);
