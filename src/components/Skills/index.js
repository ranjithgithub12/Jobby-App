import './index.css'

const Skills = props => {
  const {eachSkills} = props
  const {name, imageUrl} = eachSkills

  return (
    <li className="list-of-skills">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
