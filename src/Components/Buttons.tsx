import '../style/buttonStyle.css';

export const Buttons = () => (
  <div className='flex-div flex-vert-align-center flex-wrap margin-bottom-07'>
    <button type='button' className='undp-button button-primary button-arrow'>Read More</button>
    <button type='button' className='undp-button button-secondary button-arrow'>Read More</button>
    <button type='button' className='undp-button button-primary disabled button-arrow'>Read More</button>
    <button type='button' className='undp-button button-tertiary button-arrow'>Read More</button>
    <button type='button' className='undp-button button-tertiary disabled button-arrow'>Read More</button>
  </div>
);
