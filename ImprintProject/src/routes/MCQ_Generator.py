# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_community.utilities import SQLDatabase
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.runnables import RunnablePassthrough
# from langchain_core.messages import AIMessage
# from langchain_core.pydantic_v1 import BaseModel,Field
# from langchain_core.output_parsers import JsonOutputParser
# from flask import Flask,jsonify,request

# class JsonCreater(BaseModel):
#     Question: str = Field(description="Question")
#     Options: list = Field(description="Options for the answer in a list format")
#     Answer: str = Field(description="Answer to the question")
#     Reason: str = Field(description="Reason for the answer")


# def get_schema(_):
#     schema = db.get_table_info()
#     return schema

# def Parse(message: AIMessage) -> str:
#     return message.content.split('\n')[1]

# def run_query(query):
#     return db.run(query)

# MySQL_URI = 'mysql+mysqlconnector://root:Niranjan05%40@localhost:3306/anki'
# db = SQLDatabase.from_uri(MySQL_URI)
# llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash",google_api_key="AIzaSyAdxrAEyopCZBNTAMScjBhPh5SFGi7x0CI")
# app = Flask(__name__)

# @app.route("/summary",methods=['POST'])
# def summary():
#     question = request.json.get('question')
#     template = """Based on the table schema given below, write an SQL query responding to that user's question. You do not have permission to modify the structure of the database or the tables. The answer must strictly be only in this format.
#     There must be no characters before or after the query. : 
#     {schema}

#     Question : {question}
#     SQL Query:"""
#     prompt = ChatPromptTemplate.from_template(template)

#     full_template = """Based on the given user's question and Query Response generate MCQ based questions. They must consist of tricky options. Generate 4 options. Only give me the question,options,correct answer and the reason for the correct answer.
#     Respond with a JSON object using the following instructions :
#     {{
#         "Question": "<The question in a string format>",
#         "Options": "<The multiple choice options as a list>",
#         "Answer": "<The answer must be in a string format>",
#         "Reason": "<The reason for the answer>"
#     }}
#     {schema}

#     Question : {question}
#     SQL Query : {query}
#     SQl Response : {response}
#     """
#     prompt_response = ChatPromptTemplate.from_template(full_template)

#     Sql_Chain = (
#         RunnablePassthrough.assign(schema = get_schema)
#         | prompt
#         | llm
#         | Parse
#     )
#     parser = JsonOutputParser(pydantic_object=JsonCreater)

#     full_chain = (
#         RunnablePassthrough.assign(query=Sql_Chain).assign(
#             schema=get_schema,
#             response=lambda vars: run_query(vars["query"]),
#         )
#         | prompt_response
#         | llm
#         | parser
#     )
#     return jsonify(full_chain.invoke({"question":question}))

# if __name__ == '__main__':
#     print("Starting Flask Server...")
#     app.run()



from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.utilities import SQLDatabase
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.messages import AIMessage
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.output_parsers import JsonOutputParser
from flask import Flask, jsonify, request

class JsonCreater(BaseModel):
    Question: str = Field(description="Question")
    Options: list = Field(description="Options for the answer in a list format")
    Answer: str = Field(description="Answer to the question")
    Reason: str = Field(description="Reason for the answer")

def get_schema():
    return db.get_table_info()

def Parse(message: AIMessage) -> str:
    return message.content.strip().split('\n')[-1]

def run_query(query):
    return db.run(query)

# Database and LLM Configuration
MySQL_URI = 'mysql+mysqlconnector://root:Niranjan05%40@localhost:3306/anki'
db = SQLDatabase.from_uri(MySQL_URI)
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key="YOUR_GOOGLE_API_KEY")

# Flask App Initialization
app = Flask(__name__)

@app.route("/summary", methods=['POST'])
def summary():
    # Receive question from frontend
    question = request.json.get('question')
    
    # Generate SQL query based on schema and question
    schema = get_schema()
    template = """Based on the table schema given below, write an SQL query responding to the user's question.
    You do not have permission to modify the structure of the database or the tables.
    The answer must strictly be only in this format with no characters before or after the query:
    
    {schema}

    Question: {question}
    SQL Query:"""
    
    prompt = ChatPromptTemplate.from_template(template)
    prompt_response_template = """Based on the user's question and the SQL Query Response, generate a tricky MCQ question. Include 4 options.
    Respond with a JSON object using the following format:
    {{
        "Question": "<Question in string format>",
        "Options": ["<option1>", "<option2>", "<option3>", "<option4>"],
        "Answer": "<Correct answer as a string>",
        "Reason": "<Reason for the correct answer>"
    }}

    Schema:
    {schema}

    Question: {question}
    SQL Query: {query}
    SQL Response: {response}
    """

    prompt_response = ChatPromptTemplate.from_template(prompt_response_template)

    Sql_Chain = (
        RunnablePassthrough.assign(schema=schema)
        | prompt
        | llm
        | Parse
    )
    parser = JsonOutputParser(pydantic_object=JsonCreater)

    full_chain = (
        RunnablePassthrough.assign(query=Sql_Chain).assign(
            schema=schema,
            response=lambda vars: run_query(vars["query"]),
        )
        | prompt_response
        | llm
        | parser
    )
    
    # Execute the full chain
    try:
        result = full_chain.invoke({"question": question})
        return jsonify(result)
    except Exception as e:
        # Log error and return appropriate message
        print("Error:", e)
        return jsonify({"error": "Failed to generate MCQ. Please check logs for more details."}), 500

if __name__ == '__main__':
    print("Starting Flask Server...")
    app.run(debug=True)
