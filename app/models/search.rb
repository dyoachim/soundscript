class Search

  #!/usr/bin/ruby

  # Set DEVELOPER_KEY to the API key value from the APIs & auth > Credentials
  # tab of
  # {{ Google Cloud Console }} <{{ https://cloud.google.com/console }}>
  # Please ensure that you have enabled the YouTube Data API for your project.
  DEVELOPER_KEY = ENV['ENV_YOUTUBE_API']
  YOUTUBE_API_SERVICE_NAME = 'youtube'
  YOUTUBE_API_VERSION = 'v3'

  def self.get_service
    client = Google::APIClient.new(
      :key => DEVELOPER_KEY,
      :authorization => nil,
      :application_name => 'soundscript',
      :application_version => '1.0.0'
    )
    youtube = client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)

    return client, youtube
  end

  def self.main(search_term)
    opts = Trollop.options do
      opt :q, 'Search term', :type => String, :default => search_term
      opt :max_results, 'Max results', :type => :int, :default => 28
    end

    client, youtube = get_service

    begin
      # Call the search.list method to retrieve results matching the specified
      # query term.
      search_response = client.execute!(
	:api_method => youtube.search.list,
	:parameters => {
	  :part => 'snippet',
	  :q => opts[:q],
	  :maxResults => opts[:max_results]
	}
      )

      videos = []


      # Add each result to the appropriate list, and then display the lists of
      # matching videos, channels, and playlists.


    rescue Google::APIClient::TransmissionError => e
      puts e.result.body
    end

    return search_response.data.items
  end

  def self.video_by_id(id)

    opts = Trollop::options do
      opt :id, id, :type => String, :default => id
    end

    client, youtube = get_service

    begin
      # Call the search.list method to retrieve results matching the specified
      # query term.
      search_response = client.execute!(
	:api_method => youtube.videos.list,
	:parameters => {
	  :part => 'contentDetails',
	  :id => opts[:id]
	}
      )


    rescue Google::APIClient::TransmissionError => e
      puts e.result.body
    end

    return search_response.data.items
  end
end
