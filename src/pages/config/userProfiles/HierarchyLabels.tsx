import Checkbox from "@material-ui/core/Checkbox";

export interface HierarchyLabelsProps {
  labels: { default: string; display: string; checked: boolean }[];
  setLabel: Function;
}

const HierarchyLabels: React.FC<HierarchyLabelsProps> = ({ labels, setLabel }) => {
  const previewLabels = labels.filter((x) => x.checked);

  return (
    <div className="flex xl:flex-nowrap flex-wrap min-w-420px">
      <div className="xl:w-2/3 w-full xl:border-r border-gray-400 pr-3">
        <div className="flex items-center font-semibold mb-2">
          <div className="w-1/2 flex items-center">
            <Checkbox
              color="primary"
              onChange={(e) => {
                labels.forEach((l, i) => {
                  setLabel({ ...l, checked: e.target.checked }, i);
                });
              }}
              checked={labels.filter((x) => !x.checked).length === 0}
            ></Checkbox>
            <div>Default Labels</div>
          </div>
          <div className="w-1/2">Display Labels</div>
        </div>
        {labels.map((label, i) => (
          <div key={`hier-label-${i}`} className="flex items-center mb-2">
            <div className="w-1/2 flex items-center">
              <Checkbox
                color="primary"
                checked={label.checked}
                onChange={(e) => setLabel({ ...label, checked: e.target.checked }, i)}
              ></Checkbox>
              <div>{label.default}</div>
            </div>
            <div className="w-1/2 max-w-xs">
              <input
                onChange={(e) => {
                  setLabel({ ...label, display: e.target.value }, i);
                }}
                type="text"
                placeholder="Type here"
                className="outline-none focus:outline-none border-b border-black py-1 px-2"
                value={label.display}
              ></input>
            </div>
          </div>
        ))}
      </div>
      <div className="xl:w-1/3 w-full px-4">
        <div className="font-semibold mb-3 leading-42px">Preview</div>
        <div className="flex">
          <div className="mr-2">
            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
            <div className="-mt-1">
              {new Array(Math.max(previewLabels.length - 1, 0)).fill(0).map((x, i) => (
                <div className="flex justify-center" key={`line-${i}`}>
                  <div className="h-22px w-2px mb-2px bg-blue-400"></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {previewLabels.map((x, i) => (
              <div className="leading-none mb-2" key={`preview-label-${i}`}>
                {x.display ? x.display : x.default}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HierarchyLabels;
