import { Fragment } from "react";
import { PinInput } from "@flowstack-ui/brick";

export function PinInputSeparator() {
  return (
    <PinInput.Root length={6} layout="attached" aria-label="Recovery code">
      <PinInput.Control>
        {[0, 3].map((start) => (
          <Fragment key={start}>
            {start > 0 && <PinInput.Separator />}
            <PinInput.Group>
              {[start, start + 1, start + 2].map((index) => (
                <PinInput.Input key={index} index={index} />
              ))}
            </PinInput.Group>
          </Fragment>
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
