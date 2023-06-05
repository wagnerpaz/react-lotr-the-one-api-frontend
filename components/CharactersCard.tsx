const CharacterCard = ({ character }) => {
  return (
    <div className="text-xs shadow-md shadow-black px-4 pt-2 pb-4 rounded-md border border-dark-800 overflow-hidden">
      <h3 className="font-bold text-xl mb-2 bg-dark -mx-4 -mt-2 px-4 py-2">
        {character.name}
      </h3>
      <div className="opacity-60 leading-relaxed">
        <div>
          <strong>Height:</strong> {character.height || "unknow"}
        </div>
        <div>
          <strong>Race:</strong> {character.race || "unknow"}
        </div>
        <div>
          <strong>Gender:</strong> {character.gender || "unknow"}
        </div>
        <div>
          <strong>Birth:</strong> {character.birth || "unknow"}
        </div>
        <div>
          <strong>Spouse:</strong> {character.spouse || "unknow"}
        </div>
        <div>
          <strong>Death:</strong> {character.death || "unknow"}
        </div>
        <div>
          <strong>Realm:</strong> {character.realm || "unknow"}
        </div>
        <div>
          <strong>Hair:</strong> {character.hair || "unknow"}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
