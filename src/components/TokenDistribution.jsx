import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import './TokenDistribution.css'

// Visual data - exaggerated for better visibility
const visualData = [
  { name: 'Public Launch on Pump.fun', value: 68, actualValue: 93.5, tokens: '935,000,000', color: '#1a1a1a' },
  { name: 'Public Staking Pool', value: 20, actualValue: 5, tokens: '50,000,000', color: '#2d2d2d' },
  { name: 'Paid DEX / NFT Development Costs', value: 12, actualValue: 1.5, tokens: '15,000,000', color: '#404040' }
]

// Actual data for labels and tooltips
const actualData = [
  { name: 'Public Launch on Pump.fun', value: 93.5, tokens: '935,000,000', color: '#1a1a1a' },
  { name: 'Public Staking Pool', value: 5, tokens: '50,000,000', color: '#2d2d2d' },
  { name: 'Paid DEX / NFT Development Costs', value: 1.5, tokens: '15,000,000', color: '#404040' }
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  // Use actual percentage instead of visual percentage
  const actualPercent = payload.actualValue

  return (
    <g>
      <text 
        x={x} 
        y={y - 8} 
        fill="#39ff14" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize="16"
        fontWeight="bold"
      >
        {`${actualPercent}%`}
      </text>
      <text 
        x={x} 
        y={y + 8} 
        fill="#ffffff" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="normal"
      >
        {payload.tokens}
      </text>
    </g>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{data.payload.name}</p>
        <p className="tooltip-value">{`${data.payload.actualValue}% (${data.payload.tokens} tokens)`}</p>
      </div>
    )
  }
  return null
}

function TokenDistribution() {
  return (
    <section className="token-distribution">
      <div className="container">
        <h2 className="section-title">$ROOT Token Distribution</h2>
        <div className="token-info">
          <p className="token-supply">Total Supply: <strong>1,000,000,000 $ROOT</strong></p>
          <p className="token-platform">Pump.fun Token with Standard Tokenomics</p>
          <p className="visual-note">*Chart sections enlarged for visibility - percentages show actual allocation</p>
        </div>
        <div className="chart-container">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={visualData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={160}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {visualData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="distribution-legend">
            {actualData.map((entry, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <div className="legend-text">
                  <div className="legend-percentage"><strong>{entry.value}%</strong></div>
                  <div className="legend-name">{entry.name}</div>
                  <div className="legend-tokens">{entry.tokens} tokens</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TokenDistribution