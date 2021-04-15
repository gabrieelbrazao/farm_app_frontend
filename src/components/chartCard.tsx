import { Typography } from '@material-ui/core'
import { CardTexts, Icon, StyledCard } from '../styles/components/chartCard'

interface IProps {
  count: number
  description: string
}

const ChartCard: React.FC<IProps> = ({ count, description }) => {
  return (
    <StyledCard>
      <Icon color="primary" />

      <CardTexts>
        <Typography variant="h3">{count}</Typography>
        <Typography variant="h6">{description}</Typography>
      </CardTexts>
    </StyledCard>
  )
}

export default ChartCard
