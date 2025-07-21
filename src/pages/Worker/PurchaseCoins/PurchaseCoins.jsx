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
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-gradient dark:text-blue-300">🪙 Purchase Coins</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Choose your coin package below</p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {coinOptions.map((pkg) => (
          <div
            key={pkg.coins}
            onClick={() => handleSelectPackage(pkg)}
            className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-md transition duration-200 p-6 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{pkg.coins} Coins</h3>
            <p className="text-md text-gray-600 dark:text-gray-400 mt-2">Only ${pkg.price}</p>
            <button className="btn btn-primary mt-4 w-full">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoins;