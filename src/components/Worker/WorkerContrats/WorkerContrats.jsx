import './workerContrats.css'

function WorkerContrats({ user }) {
  const currentDate = new Date()

  const contratsEnCours =
    user && user.contrats
      ? user.contrats.filter((contrat) => contrat.status === 'en cours')
      : []

  const contratsAVenir =
    user && user.contrats
      ? user.contrats.filter(
          (contrat) => new Date(contrat.dateDebut) > currentDate,
        )
      : []

  return (
    <>
      <section className="contrat-section">
        <h3>Contrat en cours</h3>
        {user && user.contrats && user.contrats.length === 0 ? (
            <>
          <div className="noData">cette employé n'a pas de contrats</div>
          <button className='btn btn-block'>Créer un contrat</button>
            </>
        ) : contratsEnCours.length === 0 ? (
            <>
          <div className="noData">
            cette employé n'a pas de contrats en cours
          </div>
           <button className='btn btn-block'>Créer un contrat</button>
            </>
        ) : (
          contratsEnCours.map((contrat) => (
            <div className="contratDetails" key={contrat._id}>
              <p className="tagContrat">{contrat.type}</p>
              <div className='detailContrat'>
                {' '}
                Jours de travail hebdomadaire :{' '}
                <span> {contrat.JoursTravaileParSemaine}</span>
              </div>
              <div className='detailContrat'>
                {' '}
                Poste : <span>{contrat.poste} </span>{' '}
              </div>
              <div className='detailContrat'>
                {' '}
                qualification : <span>{contrat.qualification} </span>{' '}
              </div>
              <div className='detailContrat'>
                {' '}
                Echelon : <span>{contrat.echelon} </span>{' '}
              </div>
              <div className='detailContrat'>
                {' '}
                Taux horraire brut :{' '}
                <span> {contrat.tauxHorraireBrut} XPF </span>{' '}
              </div>
              <div className='detailContrat'>
                {' '}
                Indeminités transport:{' '}
                <span> {contrat.indeminitesTransport} XPF </span>
              </div>
              <div className='detailContrat'>
                {' '}
                Date de début du contrat :{' '}
                <span>{new Date(contrat.dateDebut).toLocaleDateString()} </span>
              </div>
              <div className="avenantsSection">
                <h4>Avenants</h4>
                <p>Vous pouvez modifier ce contrat par avenants</p>
                <button className="btn btn-block">
                  Créer un avenant pour ce contrat
                </button>
              </div>
            </div>
          ))
        )}
      </section>
      <section className="contrat-section">
        <h3>Contrat à venir</h3>
        {contratsAVenir.length === 0 ? (
            <>
          <div className="noData">
            cette employé n'a pas de contrats à venir
          </div>
           <button className='btn btn-block'>Créer un contrat</button>
            </>
        ) : (
          contratsAVenir.map((contrat) => (
            <div className="contratDetails" key={contrat._id}>
              <div>
                {' '}
                Jours de travail hebdomadaire :{' '}
                {contrat.JoursTravaileParSemaine}
              </div>
              <div> Poste : {contrat.poste}</div>
              <div> qualification : {contrat.qualification}</div>
              <div> Echelon : {contrat.echelon}</div>
              <div> Taux horraire brut : {contrat.tauxHorraireBrut} XPF</div>
              <div>
                {' '}
                Indeminités transport: {contrat.indeminitesTransport} XPF
              </div>
              <div>
                {' '}
                Date de début du contrat :{' '}
                {new Date(contrat.dateDebut).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  )
}

export default WorkerContrats
