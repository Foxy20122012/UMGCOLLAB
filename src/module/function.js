class Function {

    static sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    static isCUI = (cui) => {
        try{
            let cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;

            cui = cui.toString();
            
            if(cui === null || !cui || !cuiRegExp.test(cui))
                return false;
                
            cui = cui.replace(/\s/, '');            

            let city = parseInt(cui.substring(9, 11), 10);
            let town = parseInt(cui.substring(11, 13));
            let number = cui.substring(0, 8);
            let verificator = parseInt(cui.substring(8, 9));
            
            let townsOnCity = [
                { city: 'Guatemala', amount: 17 },
                { city: 'Progreso', amount: 8},
                { city: 'Sacatepéquez', amount: 16},
                { city: 'Chimaltenango', amount: 16},
                { city: 'Escuintla', amount: 13},
                { city: 'Santa Rosa', amount: 14},
                { city: 'Sololá', amount: 19},
                { city: 'Totonicapán', amount: 8},
                { city: 'Quetzaltenango', amount: 24},
                { city: 'Suchitepéquez', amount: 21},
                { city: 'Retalhuleu', amount: 9},
                { city: 'San Marcos', amount: 30},
                { city: 'Huehuetenango', amount: 32},
                { city: 'Quiché', amount: 21},
                { city: 'Baja Verapaz', amount: 8},
                { city: 'Alta Verapaz', amount: 17},
                { city: 'Petén', amount: 14},
                { city: 'Izabal', amount: 5},
                { city: 'Zacapa', amount: 11},
                { city: 'Chiquimula', amount: 11},
                { city: 'Jalapa', amount: 7},
                { city: 'Jutiapa', amount: 17}
            ];
            
            if (city === 0 || town === 0)
                return false;
            
            if (city > townsOnCity.length)
                return false;
            
            if (town > townsOnCity[city -1].amount)
                return false;
            
            let total = 0;
            
            for (let i = 0; i < number.length; i++)
                total += number[i] * (i + 2);
            
            return  (total % 11) === verificator;
        }
        catch {
            return false
        }
    }

    static isNIT = (nit) => {
        try {
            let nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');

            nit = nit.toString();
        
            if (!nit || !nitRegExp.test(nit)) 
                return false;
        
            nit = nit.replace(/-/, '');
            let lastChar = nit.length - 1;
            let number = nit.substring(0, lastChar);
            let expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();
        
            let factor = number.length + 1;
            let total = 0;
        
            for (let i = 0; i < number.length; i++) {
                let character = number.substring(i, i + 1);
                let digit = parseInt(character, 10);
        
                total += (digit * factor);
                factor = factor - 1;
            }
        
            let modulus = (11 - (total % 11)) % 11;
            let computedChecker = (modulus === 10 ? "k" : modulus.toString());
        
            return expectedCheker === computedChecker;
        }
        catch {
            return false;
        }
    }

    static isName = (name) => {
        if(name === null)
            return false;

        return name.match(/^([a-zA-Z ]|á|é|í|ó|ú|Á|É|Í|Ó|Ú|ñ|Ñ)+$/);
    }

    static formatDate = (stringDate) => {
        try {
            let date = new Date(stringDate);
    
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            day = day <= 9? `0${day}`: day;
            month = month <= 9? `0${month}`: month;

            return `${day}/${month}/${year}` 

        }
        catch {
            return '';
        }
    }

}

export default Function;
