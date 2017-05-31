import * as d3ease from 'd3-ease';

class Interpolator
{
    constructor({ type, from, to, easing, duration, delay })
    {
        this.from = from !== undefined ? from : 0;
        this.to = to !== undefined ? to : 1;
        this.duration = duration !== undefined ? duration : 1000;
        this.time = 0;

        this.easer = easing 
            ? d3ease[easing]
            : d3ease['easeLinear'];

        this.delayDuration = delay !== undefined ? delay : 0;
        this.delayTime = 0;
    }

    reset()
    {
        this.time = 0;
        this.delayTime = 0;
    }

    interpolate(deltaTime)
    {
        if (this.delayDuration > 0)
        {
            // forward case - deltaTime must first exhaust the delayTime before being added to time
            if (deltaTime > 0)
            {
                this.delayTime += deltaTime;

                // delayTime has been exhausted during this interpolation period - make sure to clip deltaTime
                if (this.delayTime > this.delayDuration)
                {
                    deltaTime = this.delayTime - this.delayDuration;
                    this.delayTime = this.delayDuration;
                }
                // delayTime has not been exhausted - deltaTime should not used yet for animation progress
                else
                {
                    deltaTime = 0;
                }
            }
            // reverse case - deltaTime must exhaust the delayTime after being added to time
            else if (deltaTime < 0)
            {
                let progress = (this.time + deltaTime) / this.duration;
                if (progress <= 0 && this.delayTime > 0)
                {
                    this.delayTime = Math.max(0, this.delayTime + (this.time + deltaTime));
                }
            }
        }

        // calculate animation progress
        this.time = Math.max(Math.min(this.time + deltaTime, this.duration), 0);
        const progress = this.time / this.duration;

        // eased value based on animation progress
        return this.from + (this.easer(progress) * (this.to - this.from));
    }

    isDone()
    {
        return (this.time === 0 && this.delayTime === 0) || (this.time === this.duration && this.delayTime === this.delayDuration);
    }
}

export default Interpolator;