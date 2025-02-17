import { Card } from "@/components/Card/Card";

function LocationsAndVariables() {
  /**
   *  consider logic for showing variables
   *  isshowing per location?
   *  const [isShowing, setIsShowing] = useState({
   *  location1: false,
   *  location2: true,
   *  location3: true
   * })
   *  additionally, do i want to persist this data so that variables will remain showing when users leave and return?
   *  */

  return (
    <div className="flex flex-col space-y-6">
      <Card>
        <div>
          <h2 className="font-poppins">Sickvile</h2>
          <p>1337 Kevin Mitnick Rd, Warrendale, PA</p>
          <p>212-555-1234</p>
          <div className="mt-1">
            <button className="underline" onClick={() => {}}>
              Show Variables
            </button>
            {
              <div className="mt-2 grid auto-cols-auto">
                {/* variables here */}
              </div>
            }
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="font-poppins">Sickvile</h2>
          <p>1337 Kevin Mitnick Rd, Warrendale, PA</p>
          <p>212-555-1234</p>
          <button className="underline" onClick={() => {}}>
            Show Variables
          </button>
        </div>
      </Card>
    </div>
  );
}

export default LocationsAndVariables;
