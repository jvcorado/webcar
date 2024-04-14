export default function CardCarLoad() {
  const array = [1, 2, 3, 4];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:mt-5">
        {array.map((element) => {
          return (
            <div key={element} className="flex items-center justify-center">
              <div className="w-full rounded overflow-hidden shadow-lg animate-pulse">
                <div className="h-52 bg-gray-300"></div>
                <div className="px-6 py-4">
                  <div className="h-6 bg-gray-300 mb-2"></div>
                  <div className="h-4 bg-gray-300 w-2/3"></div>
                </div>
                <div className="px-6 pt-4 pb-6">
                  <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 w-1/2"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
