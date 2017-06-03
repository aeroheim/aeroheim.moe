import deepEqual from 'deep-equal';

const handleMatch = (props, nextProps, onMatch, onUnmatch) =>
{
    if (!deepEqual(props.match, nextProps.match))
    {
        if (nextProps.match && onMatch)
        {
            onMatch();
        }
        else if (onUnmatch)
        {
            onUnmatch();
        }
    }
}

export default handleMatch;