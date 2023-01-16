import sys
import requests
from dotenv import load_dotenv
load_dotenv()
import os
import json 

from api import NgisOpenApi

def get_api():
    url = os.getenv('NGISAPI_URL')
    user = os.getenv('NGISAPI_USER')
    password = os.getenv('NGISAPI_PASS')
    return NgisOpenApi(url, user, password, "KartAITest")


def save_json(data, filename):
    f = open(filename, "w")
    f.write(json.dumps(data))
    f.close()

def main() -> int:
    api = get_api()

    dataset_id = '63cb2b40-1461-4a9a-90c1-446ef0ee42f4'
    #dataset_id = '1eb5a249-c7c5-4328-9a7f-9c6d1ce6d526'

    #print("Datasets")
    #print(api.get_datasets())

    #print("Dataset")
    #print(api.get_dataset_info(dataset_id))

    print("features")
    res = api.get_features(dataset_id, "584080.3856561417,6638847.17958132,584237.6979578076,6639009.613057086", "Bygning")
    print(len(res["features"]))
    save_json(res, "result2.geojson")

    return 0

if __name__ == '__main__':
    sys.exit(main())