

export default class NPCActor extends Actor
{
   // constructor should get the values and be able to rebuild the actor at any time from foundry, but the first function
   // should be to check that this actor hasn't already been created as knowledgeRecalledActor.
   constructor(data
   ) {
      // There are a few good places to query data. The first is on the main actor and then under system.
      // under items there are a lot of things as well. Spells, melee, weapons, etc.
      super();
      verifyExistingActor();
      this.data = data;
      getBaseCharacterInfo();
      getSaves();
      getActions();
      getItems();
      getTraits();
      }
   actorID = "";

   baseCharacterInfo = {
      name: "",
      description: "",
      actorImg: "",
      visibility: false
   }
   rarity = {
      value: "",
      visibility: false
   }
   traits = new Map(String, Boolean)

   armorClass = {
      value: 0,
      visibility: false
   }
   fortitudeSave = {
      value: 0,
      visibility: false
   }
   reflexSave = {
      value: 0,
      visibility: false
   }
   willSave = {
      value: 0,
      visibility: false
   }
   immunities = new Map(String, Boolean)
   resistances = new Map(String, Boolean)
   weaknesses = new Map(String, Boolean)
   abilities = {
      ability: [
         {
            name: "",
            description: "",
            visibility: false
         }
      ]
   }
   attacks = {
      attack: [
         {
            name: "",
            description: "",
            visibility: false
         }
      ]
   }
   passiveAbilities = {
      passiveAbility: [
         {
            name: "",
            description: "",
            visibility: false
         }
      ]
   }
   spells = {
      spell: [
         {
            name: "",
            description: "",
            visibility: false
         }
      ]
   }

}

export default class KnowledgeRecalledActor extends NPCActor {
   // to eliminate unnecessary data, we can provide an override function that will override DC when the GM chooses to do so,
   // and if defaults are requested, we can simply recalculate or recall from foundry.
   difficultyAdjustment = [
      {
         adjustment: "normal",
         playerID: ""
      }
   ];
   notes = {
      GMNotes: {
         notes: "",
         visibility: false
      },
      playerNotes: [
         {
            playerID: "",
            description: ""
         },
      ]
   };
}


