function*i(e){switch(e.type){case"object-id":yield e.fieldName;return;case"unique-id-simple":yield e.fieldName;return;case"unique-id-composite":yield*e.fieldNames;return}}export{i as e};
