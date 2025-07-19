import { useNavigate } from "react-router";

const coinOptions = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoins = () => {
  const navigate = useNavigate();

  const handleSelectPackage = ({ coins, price }) => {
    navigate(`/payment?coins=${coins}&price=${price}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {coinOptions.map((pkg) => (
        <div
          key={pkg.coins}
          className="card bg-base-300 shadow-lg p-6 cursor-pointer hover:shadow-xl"
          onClick={() => handleSelectPackage(pkg)}
        >
          <h2 className="text-xl font-semibold">{pkg.coins} Coins</h2>
          <p className="text-sm mt-2">Only ${pkg.price}</p>
          <button className="btn btn-primary mt-4">Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoins;