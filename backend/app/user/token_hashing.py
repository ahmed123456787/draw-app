import hashlib

def generate_token_from_name(child_name,parent_name, length=5):
    """
    Generate a short token based on the input name.
    Uses a hash function to ensure the token is deterministic.
    """
    str_to_hash = child_name + "-" + parent_name 
    hash_object = hashlib.md5(str_to_hash.encode())  # Create an MD5 hash of the name
    hash_hex = hash_object.hexdigest()  # Get the hexadecimal representation
    return hash_hex[:length].upper()  # Take the first `length` characters
