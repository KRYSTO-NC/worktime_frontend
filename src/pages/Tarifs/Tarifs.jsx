import TarifCard from '../../components/TarifCard/TarifCard'
import Gradient from '../../components/shared/Gradient/Gradient'
import './tarifs.css'

function Tarifs() {
  return (
    <Gradient>
    <section className="heading">
      <h2>Des Tarifs Adaptés à Vos Besoins</h2>
      <p>
        Comprendre la valeur du temps, c'est aussi comprendre la valeur de l'argent. C'est pourquoi nous proposons des tarifs compétitifs et adaptés à toutes les tailles d'entreprise. Que vous soyez une startup en phase de lancement ou une entreprise établie cherchant à optimiser ses coûts, nos plans de tarification sont conçus pour vous offrir le meilleur rapport qualité-prix. Explorez nos options et trouvez le plan qui correspond le mieux à vos besoins et à votre budget.
      </p>
    </section>

    <section className='tarifCardContainer'>
      <TarifCard/>
      <TarifCard/>
      <TarifCard/>
      
    </section>
  </Gradient>
  )
}

export default Tarifs