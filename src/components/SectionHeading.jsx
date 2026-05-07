import Divider from './Divider';

const SectionHeading = ({ eyebrow, title, centered = false }) => {
  const alignStyle = centered ? { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' } : {};
  
  return (
    <div style={{ marginBottom: '3rem', ...alignStyle }}>
      {eyebrow && <span className="eyebrow" style={{ marginBottom: '0.5rem', display: 'block' }}>{eyebrow}</span>}
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{title}</h2>
      <Divider style={centered ? { margin: '1rem auto' } : { margin: '1rem 0' }} />
    </div>
  );
};

export default SectionHeading;
