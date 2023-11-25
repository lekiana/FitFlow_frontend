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
    <Card sx={{width: "50%"}}>
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
              Net Profit
            </Typography>
            
            <Stack direction="row" spacing={5}>
              <Stack>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  Planned
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
                  Current
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