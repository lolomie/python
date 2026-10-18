import { PinkPorsche } from '../assets/PinkPorsche'
import { story } from '../config/story'

export function RoadTrip() {
  return <figure className="road-trip-scene">
    <PinkPorsche driver={story.roadTrip.driverName} passenger={story.roadTrip.passengerName}/>
    <figcaption><p className="road-trip-caption">{story.roadTrip.caption}</p><p className="road-trip-note">{story.roadTrip.note}</p></figcaption>
  </figure>
}
