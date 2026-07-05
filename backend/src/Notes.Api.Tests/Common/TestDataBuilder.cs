public class TestDataBuilder
{
    public class NoteRequestBuilder
    {
        private string _title = "Testing Note";
        private string _content = "Testing Content";

        public NoteRequestBuilder WithTitle(string title)
        {
            _title = title;
            return this;
        }
        public NoteRequestBuilder WithContent(string content)
        {
            _content = content;
            return this;
        }

        public object Build() => new { Title = _title, Content = _content };
    }

    public class UserRequestBuilder
    {
        private string _username = "Testing username";
        private string _password = "Testing password";

        public UserRequestBuilder WithUsername(string username)
        {
            _username = username;
            return this;
        }
        public UserRequestBuilder WithPassword(string password)
        {
            _password = password;
            return this;
        }

        public object Build() => new { Username = _username, Password = _password };

    }
}