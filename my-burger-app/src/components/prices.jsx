import { Loader } from './index';

const Prices = (props) => {
  const { prices, loading } = props;

  return (
    <div id='price-container'>
      <span className='price-header'>Price</span>
      {loading ? (
        <Loader />
      ) : (
        <>
          {prices?.map((item) => (
            <span key={item._id} className='price-item'>
              {item.name} : {item.price} $
            </span>
          ))}
        </>
      )}
    </div>
  );
};
export default Prices;
