package medoffice;

import jsftoolkit.ejb.PersistenceResolverApi;
import javax.ejb.Singleton;

@Singleton
public class PersistenceResolver implements PersistenceResolverApi {

   @Override
   public String getPersistenseUnitName(String entityName) {      
      return "persistence/medoffice";
   }
}
