import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

export const Goal = ({
    currentProfit,
    plannedProfit,
  }) => {

  return (
    <Card sx={{}}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>

            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Means
            </Typography>
            
            <Stack direction="row" spacing={5}>
              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  All
                </Typography>
                <Typography variant="h4">
                  {plannedProfit}
                </Typography>
              </Stack>

              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  Available
                </Typography>
                <Typography variant="h4">
                    {currentProfit}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

Goal.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};

export default Goal;