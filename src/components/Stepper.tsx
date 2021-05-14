import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  indicatorsContainer: {
    position: "relative",
    padding: "100px 0",
    margin: "0 20px",
    width: "35px",
    alignSelf: "start",
  },

  indicatorsLineContainer: {
    width: 35,
    height: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    zIndex: 0,
  },

  indicatorsLine: {
    width: 2,
    height: "100%",
    background: "lightGray",
  },

  step: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    border: "1px solid gray",
  },

  activeStep: {
    background: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    color: "white",
  },

  completedStep: {
    border: "1px solid green",
    fontWeight: "bold",
  },
  completedStepText: {
    fontWeight: "bold",
  },

  stepsContainer: {
    position: "relative",
    zIndex: 10,
  },

  checkIcon: {
    color: "green",
  },

  stepTextContainer: {
    height: 65,
  },

  stepLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  stepComment: {
    fontSize: 14,
    fontWeight: 400,
  },

  textContainer: {
    alignSelf: "start",
    padding: "100px 0",
    maxWidth: 200,
    textAlign: (props: any) => (props.labelsPosition === "left" ? "right" : "left"),
  },
}));

export interface StepperProps {
  steps: Array<{ label: string; comment: string }>;
  activeStep: number;
  setActiveStep: Function;
  labelsPosition?: "left" | "right";
  navigable?: boolean;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  setActiveStep,
  labelsPosition = "left",
  navigable = true,
}) => {
  const classes = useStyles({ labelsPosition });
  const LabelsAndComments = () => {
    return (
      <div className={classes.textContainer}>
        {steps.map((step, ind) => (
          <div style={{ height: 87 }} className={activeStep > ind ? classes.completedStepText : ""}>
            <div className={classes.stepLabel}>{step.label}</div>
            <div className={classes.stepComment}>{step.comment}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Box display="flex" flexShrink={0} alignItems="center" position="relative">
      <div className="absolute right-5 w-35px flex h-full top-0 justify-center">
        <div className={classes.indicatorsLine}></div>
      </div>
      <div className="flex">
        {labelsPosition === "left" ? <LabelsAndComments></LabelsAndComments> : null}
        <div className={classes.indicatorsContainer}>
          <div className={classes.indicatorsLineContainer}>
            <div className={classes.indicatorsLine}></div>
          </div>
          <div className={classes.stepsContainer}>
            {steps.map((step, ind) => (
              <div
                style={{ marginBottom: ind === steps.length - 1 ? 0 : 50 }}
                key={`step-${ind}`}
                className={
                  classes.step +
                  " " +
                  (activeStep === ind
                    ? classes.activeStep
                    : activeStep > ind
                    ? classes.completedStep
                    : "")
                }
                onClick={() => (navigable ? setActiveStep(ind) : {})}
              >
                {activeStep > ind ? <CheckIcon className={classes.checkIcon}></CheckIcon> : ind + 1}
              </div>
            ))}
          </div>
        </div>
        {labelsPosition === "right" ? <LabelsAndComments></LabelsAndComments> : null}
      </div>
    </Box>
  );
};

export default Stepper;
